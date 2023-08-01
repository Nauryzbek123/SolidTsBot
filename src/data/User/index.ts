import users from "../../db/user";



export async function save(user:string) {
    const newUser = new users(user);
    await newUser.save();
}

export async function find(user:string) {
    return await users.findOne({ username: user });
}
export async function allUs({}) {
    return await users.find({});
}

export async function findByIdd(userid:string) {
    return await users.findById(userid); 
}