// import { getSession } from "@auth0/nextjs-auth0";
import connectDB from "@/app/_db/mongodb";
import { ObjectId } from "mongodb";
import User from "@/app/_db/models/user";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req, res) {
  console.log("In GET")
  return NextResponse.json({ data: {
    given_name: 'Hello',
    family_name: 'World',
    email: 'hw@email.com'
  }} , { status: 200 });



  // const uid = req.uid;

  // if (!uid) {
  //   return NextResponse.json({ data: 'UID required' }, { status: 400 });
  // }

  // try {
  //   await connectDB();
  //   // const user = await User.findById(uid);
  //   const user = { given_name: 'Hello', family_name: 'World', email: 'hw@email.com'}
  //   if (!user) {
  //     return NextResponse.json({ data: 'User not found' }, { status: 404 });
  //   }

  //   return NextResponse.json({ data: user }, { status: 200 });
  // } catch (error) {
  //   return NextResponse.json({ data: 'Error fetching user', error: error.message }, { status: 500 });
  // }







  // const session = await getSession();

  // const { user } = await getSession();

  // console.log(user)

  // if (!session?.user) {
  //   console.log("Unauthorized")
  //   return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  //   // return Response.error({ message: 'Unauthorized' });
  //   // return { status: 401, body: { message: 'Unauthorized' } };
  // }

  // const userID = ObjectId.createFromHexString(session.user.sub.substring(6));

  // res = NextResponse.json({ given_name: 'Hello' }, { status: 200 });

  // return res

  // return NextResponse.json({ message: 'Unauthorized' }, { status: 400 });

  // return Response.json({ given_name: 'Hello' });


  // try {
  //   await connectDB();
  //   const user = await User.findById(userID);
  //   if (!user) {
  //     return Response.error(404, { message: 'User not found' });
  //     // return { status: 404, body: { message: 'User not found' } };
  //   }


  //   return Response.json(user);
  //   // return { status: 200, body: user };
  // } catch (error) {
  //   return Response.error(500, { message: 'Error fetching user', error: error.message });
  //   // return { status: 500, body: { message: 'Error fetching user', error: error.message } };
  // }




}


// export default async function handler(req, res) {
//     res.status(200).json({ text: 'Hello' });

//     const session = await getSession();
//     console.log("In handler")

//     if (!session?.user) {
//         return res.status(401).json({ message: 'Unauthorized' });
//     }


//     await connectDB();
  
//     switch (req.method) {
//       case 'GET':
//         console.log("In GET")
//         return getUser(req, res);
//       case 'PUT':
//         return updateUser(req, res);
//       default:
//         res.setHeader('Allow', ['GET', 'PUT']);
//         res.status(405).end(`Method ${req.method} Not Allowed`);
//     }
//   }
  
//   // Function to fetch a user
//   async function getUser(req, res) {

//     console.log("In getUser")

//     const { uid } = req.query;

//     if (!uid) {
//       return res.status(400).json({ message: 'UID required' });
//     }
  
//     try {
//       const user = await User.findById(uid);
//       if (!user) {
//         return res.status(404).json({ message: 'User not found' });
//       }
//       console.log("User:", user)
//       res.status(200).json(user);
//     } catch (error) {
//       res.status(500).json({ message: 'Error fetching user', error: error.message });
//     }
//   }
  
//   // Function to update a user
//   async function updateUser(req, res) {
//     const { email } = req.query;
//     const updateData = req.body;
  
//     try {
//       const user = await User.findOneAndUpdate({ email: email }, updateData, { new: true });
//       if (!user) {
//         return res.status(404).json({ message: 'User not found' });
//       }
//       res.status(200).json(user);
//     } catch (error) {
//       res.status(500).json({ message: 'Error updating user', error: error.message });
//     }
//   }