import React, { useRef, useState,useEffect } from "react";

/*


// img要素をbase64にエンコードする
const ImageToBase64 = (img :HTMLImageElement, mime_type :string) => {
    // New Canvas
    let canvas :HTMLCanvasElement = document.createElement('canvas');
    canvas.width  = img.width;
    canvas.height = img.height;
    // Draw Image
    let ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    // To Base64
    return canvas.toDataURL(mime_type);
}

// base64を画像にデコードする
const base64ToImage = (base64, mime_type) =>{

}

*/


// 関数コンポーネント
export const ImageComponent = () => {
    const [base64Images,setBase64Images]=useState<string[]>([])
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(()=>{
        console.log("useEffectが呼ばれました")
        resetInput()
    },[])

    // 画像、inputタグをリセットする関数
    const resetInput = () => {
        console.log('resetInputが呼ばれました')
        if (inputRef.current){
            inputRef.current.value=''
        }
        setBase64Images([])
    }

    // 送信ボタンを押した時に発火する関数
    const handleSubmit =() => {
        console.log("画像を送信しました！")
        resetInput()
    }

    window.addEventListener('unload',resetInput)



    // ファイルが新たに選択された時に発火する関数 
    const handleInputFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log("handleInputFileが呼ばれました！")
        const files=e.target.files;
        console.log(files)

        if(!files){
            // ファイルが選択されていない場合は何もしない
            return
        };

        const fileArray=Array.from(files);

        console.log(fileArray)

        fileArray.forEach((file)=>{
            // ファイルを読み込むためのFilereaderオブジェクトを生成
            const reader = new FileReader();
            reader.onloadend = () => {
                const result = reader.result;
                if (typeof(result)!=='string'){
                    return;
                }
                setBase64Images((prevImages)=>[...prevImages,result]);
            }

            reader.readAsDataURL(file);
        })

        console.log(base64Images)
    }


    return (
        <form className="container1">
            <input type="file" multiple accept="image/jpeg, image/png" onChange={handleInputFile} ref={inputRef}/>
            {/* プレビュー部分 */}
            <div className="prev-img-container">
            {base64Images.length !== 0 && base64Images.map((image, idx) => (
                <div key={idx} className="prev-img-box">
                    <img src={image} className="prev-img"/>
                </div>
            ))}
            </div>
            <button type='submit' onClick={handleSubmit}>送信</button>
        </form>
    
    ) 

};

