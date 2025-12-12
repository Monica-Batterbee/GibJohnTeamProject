function MathsPage() {
    return(
        <>
            <div className="p-3">
                <h1 className="font bold mb-3 text-3xl">Order of operations</h1>
                <p className="pb-3"><b>B</b> - Brackets  <b>O/I</b> - Powers/Indices  <b>DM</b> - Divide or Multiply <b>AS</b> - Add or Subtract</p>
                <div>
                    <h2 className="font-bold pb-3">Example</h2>
                    <p>Calculate the value of 3 + 4^2 - 10 ÷ 2.</p>
                    <p><b>1.</b> There are no brackets (B), so calculate the power or index number first (O or I). 4^2 = 16 is the calculation becomes 3 + 10 - 10 ÷ 2.</p>
                    <p><b>2.</b> Do any divisions or multiplications (DM), working from left to right: 10 ÷ 2 = 5 so the calculation becomes 2 + 16 - 5.</p>
                    <p><b>3.</b> Then, do any additions or subtractions (AS), working from left to right: first we do the addition, 3 + 16 = 19 so the calculation becomes 19 - 5. Then do the subtraction to give the answer 14.</p>
                </div>

                <div className="mt-5">
                    <h2 className="text-3xl">Calculations involving brackets</h2>
                    <p>To carry out calculations that involve brackets, always calculate the value inside the brackets first. If there are brackets inside other brackets, calculate the inside brackets first.</p>

                    <h2 className="font-bold pb-3">Example</h2>

                    <p>Calculate the value of [40 - (2 + 4^2)] X 2 .</p>
                    <p><b>1.</b> Using the BODMAS/BIDMAS rule, first calculate the inside brackets (B). Work out the power or index in order to do this (O or I): 2 + 4^2 = 2 + 16 = 18 giving [40 - 18] X 2.</p>
                    <p><b>2.</b> Next, do the outer brackets: 40 - 18 = 22 giving 22 X 2.</p>
                    <p><b>3.</b> Once the brackets have been calculated, finish with the multiplication: 22 X 2 to give 44.</p>
                </div>
            </div>
        </>
    );
}

export default MathsPage;
 