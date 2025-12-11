function BiologyPage() {
    return(
        <>
        <div className="p-3">
            <h1 className="mb-3">Animal and Plant Cells</h1>
            <div>
                <p> - Cells are the smallest unit of life and the building blocks for all organisms.</p>
                <p> - Each component of a cell has its own function.</p>
                <p> - Animal and plant cells differ and they have similarities.</p>
                <p> - Nucleus, cell membrane, cytoplasm and mitochondria are four cell components that are found in both animal and plant cells.</p>
            </div>

            <div className="mt-5">
                <h2 className="text-3xl">What are cells?</h2>
                <p className="mt-3 mb-3">All life on Earth is made from cells. Without cells, there can be no life.</p>
                <p>Almost all cells are so small that you need a microscope to see them. Some organisms, like bacteria
                    are made of only one cell. These are unicellular organisms. Others, like trees and blue whales, are made from millions
                     or even billions of cells. These are multicellular organisms. These often have different types of cells, each with a different 
                     function. These are specialised cells.</p>
            </div>

            <div className="mt-5">
                <p>
                    Each component in the animal cell has a particular function. Animal cells often have an irregular shape.
                </p>

                <h2 className="text-3xl mt-5">What makes up an animal cell?</h2>

                <div className="mt-4 gap-6">
                    
                    <img
                    src="https://ichef.bbci.co.uk/images/ic/976xn/p09j0zk2.png"
                    className="w-full md:w-1/2"
                    />

                    <div className="md:w-1/2 flex flex-col justify-center">
                    <p className="text-2xl mb-4">The four key components of most animal cells are:</p>
                    <p className="my-2"><b>- Nucleus</b> - this contains the genetic material (DNA) of the organism and controls the cell’s activities.</p>
                    <p className="my-2"><b>- Cytoplasm</b> - the liquid that makes up most of the cell in which chemical reactions happen. This is mainly water.</p>
                    <p className="my-2"><b>- Cell Membrane</b> - a flexible outer layer that surrounds the cell and controls which substances can pass into and out from it.</p>
                    <p className="my-2"><b>- Mitochondria</b> - tiny parts of cells floating in the cytoplasm where energy is released from glucose during respiration.</p>
                    </div>

                </div>
            </div>

            <div className="mt-5">
                <h2 className="text-3xl mt-5 mb-3">What makes up a plant cell?</h2>
                <p className="mb-3">Plant cells often have a regular shape. They have the same cell components as animal cells: a nucleus, cell membrane, cytoplasm and 
                    mitochondria.</p>

                <p>They also have these extra three as well:</p>

                <p className="my-2"><b>- Cell wall:</b> a tough outer layer of the cell, which contains cellulose to provide strength and support to the plant.</p>
                <p className="my-2"><b>- Vacuole:</b> a space inside the cytoplasm that contains a watery liquid called cell sap. It keeps the cell firm.</p>
                <p className="my-2"><b>- Chloroplasts:</b>  structures found in the cells of green parts of plants only (leaves and stems) which contain a
                 green pigment called chlorophyll in which photosynthesis occurs.</p>
                <div className="mt-4 gap-6">
                    
                    <img
                    src="https://ichef.bbci.co.uk/images/ic/976xn/p09j4p12.png"
                    className="w-full md:w-1/2"
                    />

                </div>
            </div>
            
        </div>
        
        </>
    );
}

export default BiologyPage