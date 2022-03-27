import { NextApiRequest, NextApiResponse } from "next"
import { connect } from "../../../utils/connection"
import { ResponseFuncs } from "../../../utils/types"
import { generateUniqueSlug } from "../../../utils"
import NextCors from "nextjs-cors"


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

    const id: string = req.query.id as string

    // Potential Responses
    const handleCase: ResponseFuncs = {
        GET: async (req: NextApiRequest, res: NextApiResponse) => {
            const { Article } = await connect() // connect to database
            res.json(await Article.findOne({_id: id}).catch(catcher))
        },
        PUT: async (req: NextApiRequest, res: NextApiResponse) => {
            const { Article } = await connect()
            if(req.body?.title){
                await Article.findByIdAndUpdate(id, {...req.body, slug: generateUniqueSlug(req.body.title) }).catch(catcher)
            }else{
                await Article.findByIdAndUpdate(id, req.body).catch(catcher)
            }
            res.json(await Article.findOne({_id: id}).catch(catcher))
        },
        DELETE:async (req: NextApiRequest, res: NextApiResponse) => {
            const { Article } = await connect()
            const deletedArticle = await Article.remove({_id: id}).catch(catcher)
            res.json(deletedArticle)
        }
    }

    // Check if there is a response for the particular method, if so invoke it, if not response with an error
    const response = handleCase[method]
    if (response) response(req, res)
    else res.status(400).json({ error: "No Response for This Request" })
}

export default handler