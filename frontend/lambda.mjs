// import https from "node:https"

// export const handler = async (event) => {
//   console.log('Creating user for event:', event)
//   // console.log('Creating user for:', event.userName)

//   const postData = JSON.stringify({
//     username: event.request.userAttributes['preferred_username'] || event.userName,
//     cognitoId: event.userName,
//     profilePictureUrl: "i1.jpg",
//     teamId: 1
//   });
//   console.log('Request payload:', postData)


//   const options = {
//     hostname: "qytdyyl849.execute-api.us-west-1.amazonaws.com",
//     port: 443,
//     path: "/prod/users",
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       "Content-Length": Buffer.byteLength(postData, 'utf8')
//     },
//   }

//   const responseBody = await new Promise((resolve, reject) => {
//     const req = https.request(options, (res) => {
//       console.log(`statusCode: ${res.statusCode}`)
//       console.log('req:', req.path)

//       res.setEncoding("utf8")
//       let responseBody = ""

//       res.on("data", (d) => {
//         responseBody += d
//       })
//       res.on("end", () => {
//         console.log('req on end:', responseBody)
//         resolve(responseBody)
//       })
//     })

//     req.on("error", (error) => {
//       console.log('req on error:', error)
//       reject(error)
//     })

//     req.write(postData)
//     req.end()
//   });
//   return event
// };
