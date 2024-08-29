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
*/


// base64を画像にデコードする
function Base64ToImage(base64img :string, callback :Function) {
    var img = new Image();
    img.onload = function() {
        callback(img);
    };
    img.src = base64img;
}




// 関数コンポーネント
export const ImageComponent = () => {
    const [base64Images,setBase64Images]=useState<string[]>([])
    const inputRef = useRef<HTMLInputElement>(null);
    let input_style :string ='is-visible'

    useEffect(()=>{
        console.log("useEffectが呼ばれました")
        resetInput()
    },[])
    const result:string ='aa'
    // 送信ボタンを押した時に発火する関数
    const handleSubmit =() => {
        
        Base64ToImage(result,function(img :HTMLImageElement){
            // <img>要素にすることで幅・高さがわかります
            alert("w=" + img.width + " h=" + img.height);
            // <img>要素としてDOMに追加
            const mainElement = document.getElementsByClassName('encoded-img')[0];
            console.log(mainElement)
            if (mainElement) {
                mainElement.appendChild(img);
            }
        })
        console.log("画像を送信しました！")
        resetInput()
    }

    // 画像、inputタグをリセットする関数
    const resetInput = () => {
        console.log('resetInputが呼ばれました')
        if (inputRef.current){
            inputRef.current.value=''
        }
        setBase64Images([])
        input_style='is-visible'
    }

    // ブラウザバック時にinputタグをリセットする
    window.addEventListener('unload',resetInput)
    
    // ファイルが新たに選択された時に発火する関数 
    const handleInputFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log("handleInputFileが呼ばれました！")
        const files=e.target.files;
        input_style='is-hidden'

        if (base64Images.length==1){
            window.alert("選択できるが画像は1枚までです")
            return
        }

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
            {/* プレビュー部分 */}
            <div className="prev-img-container">
                {base64Images.length !== 0 && base64Images.map((image, idx) => (
                <div key={idx} className="prev-img-box">
                    <img src={image} className="prev-img"/>
                </div>
            ))}
            </div>
            <div>
            <input type="file" multiple accept="image/jpeg, image/png" onChange={handleInputFile} ref={inputRef}/>
                <button type='submit' onClick={handleSubmit}>送信</button>
            </div>
            <div className="encoded-img">
            </div>
        </form>
    
    ) 

};

