import Script from "next/script";

const Ads = () => {
    return (
        <div className="w-full h-full"> 
            <ins 
                className="adsbygoogle w-full h-full"
                style={{
                    display: 'block'
                }}
                data-ad-client="ca-pub-7524664916655286"
                data-ad-slot="1877476571"
                data-ad-format="auto"
                data-full-width-responsive="true"
            >

            </ins>
            <Script>
                (adsbygoogle = window.adsbygoogle || []).push({});
            </Script>
        </div>
    )
}

export default Ads;