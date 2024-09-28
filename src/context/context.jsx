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

    const onSent = async (promt) => {

        setResultData('');
        setLoading(true);
        setShowResult(true);
        setRecentPrompt(input); 
        
        const response =  await runChat(input);
        setResultData(response);
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

