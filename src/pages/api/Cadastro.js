"use server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function (req, res) {
    if(req.method !== 'POST') {
        res.status(405).json({message: 'Method not allowed'})
    }

    try {

    if(!req.body || !req.body?.email || !req.body?.password || !req.body?.username) {
        res.status(400).json({message: 'No body provided'})
    }

    const { email, password, username } = req.body;

    console.log(email, password, username)
    const userExists = await prisma.user.findUnique({
        where: {
            email
        }
    })

    if(userExists) {
        return res.status(400).json({message: 'User already exists'})
    }

    const user = await prisma.user.create({
        data: {
            email,
            password,
            name: username
        }
    })


    if(user?.createdAt) res.status(201).json({message: 'User created'})
    else res.status(500).json({message: 'Internal server error'})

    } catch(e) {
        console.log(e)
        res.status(500).json({message: 'Internal server error'})
    }
}