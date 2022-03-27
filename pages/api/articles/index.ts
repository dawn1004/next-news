import { NextApiRequest, NextApiResponse } from "next"
import { generateUniqueSlug } from "../../../utils"
import { connect } from "../../../utils/connection"
import { ResponseFuncs } from "../../../utils/types"
import NextCors from 'nextjs-cors';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    await NextCors(req, res, {
        // Options
        methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
        origin: '*',
        optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    });

    //capture request method, we type it as a key of ResponseFunc to reduce typing later
    const method: keyof ResponseFuncs = req.method as keyof ResponseFuncs

    //function for catch errors
    const catcher = (error: Error) => res.status(400).json({ error })

    // Potential Responses
    const handleCase: ResponseFuncs = {
        GET: async (req: NextApiRequest, res: NextApiResponse) => {
        const { Article } = await connect() // connect to database
        res.json(await Article.find({}).catch(catcher))
        },
        POST: async (req: NextApiRequest, res: NextApiResponse) => {
        const { Article } = await connect() // connect to database
        const createdArticle = await Article.create({...req.body, slug: generateUniqueSlug(req.body.title)}).catch(catcher)
        res.json(createdArticle)
        },
        // DELETE: async(req: NextApiRequest, res: NextApiResponse) => {
        //   const { Article } = await connect() // connect to database
        //   await Article.remove({_id: req.body._id})

        // }
    }

    // Check if there is a response for the particular method, if so invoke it, if not response with an error
    const response = handleCase[method]
    if (response) response(req, res)
    else res.status(400).json({ error: "No Response for This Request" })
}

export default handler