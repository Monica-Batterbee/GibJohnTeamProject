function BusinessPage() {
    return(
        <>
        <div className="p-3">
            <h1 className="mb-3">The reasons for starting a business</h1>
            <div>
                <p>There are a number of reasons that an entrepreneur may start a business. These are:</p>
                <p> - to produce a good, eg Coca-Cola and Cadbury</p>
                <p> - to provide a service</p>
                <p> - to distribute products, eg Tesco and Asda</p>
                <p> - to benefit society, eg charities and social enterprises</p>
                <p> - to fill a gap in the market, eg opening a hair salon in a village which has no other hairdresser</p>
                <p> - to fulfil a business opportunity</p>
            </div>
 
            <div className="mt-5">
                <h2 className="text-3xl">Goods and services</h2>
                <p>Goods are tangible items that can be used and stored. Businesses make goods and sell them to customers, who then own them. This includes computers, food and clothes.</p>
                <p>Services are intangible actions that cannot be stored. Businesses provide services to customers, who have access to them for a period of time. Examples include hairdressing, train journeys and internet access.</p>
            </div>
 
            <div className="mt-5">
 
                <h2 className="text-3xl mt-5">Wants</h2>
                <p>Wants are things that people would like to have but can survive without. Wants are unlimited, and might include event tickets, designer accessories, holidays, laptops, mobile phones and cars.</p>
                   
                    <img
                    src="https://bam.files.bbci.co.uk/bam/live/content/z73shbk/large"
                    alt="diagram of wants"
                    className="w-full md:w-1/2"/>
 
                <h2>Needs</h2>
                <p>Needs are things required in order to survive. These life-essential things include clothing, food, shelter, warmth and water.</p>

                    <img src="https://bam.files.bbci.co.uk/bam/live/content/zb2wkmn/large"
                    alt="diagram of needs"
                    className="w-full md:w-1/2"/>
 
            </div>
        </div>
    </>
    );
}
 
export default BusinessPage