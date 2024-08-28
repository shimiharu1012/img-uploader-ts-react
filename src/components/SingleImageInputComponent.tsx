import React, { useRef, useState,useEffect } from "react";

// 一枚の画像をアップロードする用のコンポーネント

// 関数コンポーネント
export const ImageComponent = () => {
    const [base64Images,setBase64Images]=useState<string[]>([])
    const inputRef = useRef<HTMLInputElement>(null);
    let input_style :string ='is-visible'

    useEffect(()=>{
        console.log("useEffectが呼ばれました")
        resetInput()
    },[])

    // 送信ボタンを押した時に発火する関数
    const handleSubmit =() => {
        
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
                console.log(typeof(result))
                console.log(result)
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
            <input type="file" accept="image/jpeg, image/png" onChange={handleInputFile} ref={inputRef}/>
                <button type='submit' onClick={handleSubmit}>送信</button>
            </div>
            
        </form>
    
    ) 

};

