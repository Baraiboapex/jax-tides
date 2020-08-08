
/* 
How to test: 
const setHocs = ApplyHOCS((x,y)=>x(y));
setHocs(z)(a)(b)(c);
*/

const ApplyHOCS = (HOCS) => {
    const next = (...hocs) => {
        return hoc => {
            if(!hoc){
                return hocs.reduce((acc, hoc)=>{
                    return HOCS.call(HOCS, acc, hoc)
                },0);
            }
            return next(...hocs,hoc);
        };
    };
    return next();
};

export default ApplyHOCS;