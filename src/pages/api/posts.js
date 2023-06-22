import youtubeDl from "youtube-dl-exec";

const LinkConverter = async (req, res) => {
    if(req.method !== 'POST') {
        return res.status(405).json({error: 'Method not allowed, please use POST'})
    }

    const { link } = req.body
    
    const output = await youtubeDl(link, {
        dumpSingleJson: true,
        socketTimeout: 5000,
    })
    

    const Formats = output.formats.map(e => {
        if(e.format_note && e.resolution == 'audio only') {
            return {
                format: e.format_note,
                url: e.url,
            }
        }
        return null
    }).filter(e => e != null)

    return res.status(200).json({
        title: output.title,
        thumbnail: output.thumbnail,
        formats: Formats,
    })
}


export default LinkConverter;