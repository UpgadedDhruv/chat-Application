import jwt from 'jsonwebtoken'



const generatetokenAndSetCookies= (userId, res)=>{
    const token= jwt.sign({userId}, process.env.JWT_SECRET, {expiresIn: "15d"});


    res.cookie("jwt", token ,{
        maxAge: 15*24*60*60*1000,// in millisecond
        httpOnly : true ,// cannot be access using javascript. Prevents XSS attacks cross-site scripting attacks.
        sameSite: "strict" ,
        secure : process.env.NODE_ENV !== "development"
    });
}

export default generatetokenAndSetCookies;

