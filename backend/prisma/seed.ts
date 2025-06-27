import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";
const prisma = new PrismaClient();

async function resetSequences() {
  try {
    // Models that have ID sequences to reset with their exact column names
    const models = [
      { name: "Project", idField: "id" },
      { name: "Team", idField: "id" },
      { name: "ProjectTeam", idField: "id" },
      { name: "User", idField: "userId" }, // Use exact case as defined in schema
      { name: "Task", idField: "id" },
      { name: "TaskAssignment", idField: "id" },
      { name: "Attachment", idField: "id" },
      { name: "Comment", idField: "id" }
    ];
    
    for (const model of models) {
      await prisma.$executeRawUnsafe(
        `SELECT setval(pg_get_serial_sequence('"${model.name}"', '${model.idField}'), coalesce(max("${model.idField}")+1, 1), false) FROM "${model.name}"`
      );
      console.log(`Reset sequence for ${model.name}`);
    }
  } catch (error) {
    console.error("Error resetting sequences:", error);
  }
}


async function deleteAllData(orderedFileNames: string[]) {
  const modelNames = orderedFileNames.map((fileName) => {
    const modelName = path.basename(fileName, path.extname(fileName));
    return modelName.charAt(0).toUpperCase() + modelName.slice(1);
  });

  for (const modelName of modelNames) {
    const model: any = prisma[modelName as keyof typeof prisma];
    try {
      await model.deleteMany({});
      console.log(`Cleared data from ${modelName}`);
    } catch (error) {
      console.error(`Error clearing data from ${modelName}:`, error);
    }
  }
}

async function main() {
  const dataDirectory = path.join(__dirname, "seedData");

  // Reversed order for deletion - delete dependent tables first
  const deleteOrder = [
    "taskAssignment.json",
    "comment.json",
    "attachment.json",
    "task.json",
    "user.json",
    "projectTeam.json", // Delete ProjectTeam before Team
    "project.json",
    "team.json"
  ];

  // Order for creating data
  const createOrder = [
    "team.json", 
    "project.json",
    "projectTeam.json",
    "user.json",
    "task.json",
    "attachment.json",
    "comment.json",
    "taskAssignment.json",
  ];

  await deleteAllData(deleteOrder); // Clear all data first
  await resetSequences(); // Reset all sequences after deleting data

  for (const fileName of createOrder) {
    const filePath = path.join(dataDirectory, fileName);
    const jsonData = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    const modelName = path.basename(fileName, path.extname(fileName));
    const model: any = prisma[modelName as keyof typeof prisma];

    try {
      for (const data of jsonData) {
        await model.create({ data });
      }
      console.log(`Seeded ${modelName} with data from ${fileName}`);
    } catch (error) {
      console.error(`Error seeding data for ${modelName}:`, error);
    }
  }

  await resetSequences(); // Reset all sequences after adding data

}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
