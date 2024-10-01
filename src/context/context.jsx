import { createContext } from "react";
import runChat from "../config/gemini";
import { useState } from "react";



export const Context = createContext();


const ContextProvider = (props) => {

    const [input, setInput] = useState('');
    const [recentPrompt, setRecentPrompt] = useState([]);
    const [prevPrompt, setPrevPrompt] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState('');

    const delayPara = (index, nextWord)=>{
        setTimeout(() => {
            setResultData(prev => prev + nextWord);
        }, 75*index);
        
    }

    const onSent = async (promt) => {

        setResultData('');
        setLoading(true);
        setShowResult(true);
        setRecentPrompt(input); 
        
        const response =  await runChat(input);
        let responseArray = response.split('**');
        let newResponse; ;
        for(let i=0; i<responseArray.length; i++){
            if(i===0 || i%2 !==1){
                newResponse += responseArray[i];
            } else {
                newResponse += "<strong>"+responseArray[i]+"</strong>";
            }
        }

        let newResponse2 = newResponse.split('*').join('<br>');
        setResultData(newResponse2);
        let newResponseArray = newResponse2.split(' ');
        for(let i=0; i<newResponseArray.length; i++){
            const nextWord = newResponseArray[i];
            delayPara(i, nextWord);
        }
        setLoading(false);

        setInput('');
    }


    const contextValue = {
        prevPrompt,
        setPrevPrompt,
        onSent,
        setRecentPrompt,
        recentPrompt,
        input,
        setInput,
        showResult,
        setShowResult,
        loading,
        setLoading,
        resultData,
        setResultData 
    }

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider;

