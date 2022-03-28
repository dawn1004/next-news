import { NextApiRequest, NextApiResponse } from "next"
import NextCors from "nextjs-cors";
import { connect } from "../../../../utils/connection"
import { ResponseFuncs } from "../../../../utils/types"


const handler = async (req: NextApiRequest, res: NextApiResponse) => {

  await NextCors(req, res, {
      // Options
      methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
      origin: '*',
      optionsSuccessStatus: 200,
  });

  //capture request method
  const method: keyof ResponseFuncs = req.method as keyof ResponseFuncs

  //function for catch errors
  const catcher = (error: Error) => res.status(400).json({ error })

  const slug: string = req.query.slug as string

  // Potential Responses
  const handleCase: ResponseFuncs = {
    GET: async (req: NextApiRequest, res: NextApiResponse) => {
        const { Article } = await connect() // connect to database
        res.json(await Article.findOne({slug}).catch(catcher))
    }

    
  }

  // Check if there is a response for the particular method, if so invoke it, if not response with an error
  const response = handleCase[method]
  if (response) response(req, res)
  else res.status(400).json({ error: "No Response for This Request" })
}

export default handler