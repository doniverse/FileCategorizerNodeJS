const fs = require('fs')
const path = require('path')



fs.readdir('../', (err, files)=>{
        if(err){
            // console.log(err)
        }else{
            files.forEach(async file =>{
                let ext = path.extname(file).substring(1)
                if(ext == ' ' || file == 'index.js' || file == ' ' || file == 'categorize'){
                    console.log(ext)
                    return;
                }
    
                if(fs.existsSync(path.join(`../`,`${ext}`))){
                    console.log(`\nDirectory exists ⚠️`)
                    await relocate(ext, file)
                }else{
                    await mkFoler(ext, file)
                }
            })
    
        }
    })
    


function mkFoler(ext, file){
    fs.mkdir(path.join('../', `${ext}`), async (err)=>{
        if(err){
            // console.error(err);
            return; 
        }else{
            console.log(`\n🟩Directory ${ext} created successfully!`)
            await relocate(ext, file)
        }
    })

}



async function relocate(ext, file){
    await fs.rename(path.join(`../`, `${file}`), path.join(`../`, `${ext}/${file}`), (error)=>{
        if(error){
            // console.log(error)
        }else{
            console.log(`\n ${file} moved to ../${ext}/${file}`)
        }
    })
}


