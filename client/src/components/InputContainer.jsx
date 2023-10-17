import React, { useState, useEffect } from 'react';
import { FaMicrophone } from 'react-icons/fa';
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

const InputContainer = (props) => {
    const [btnClick, setBtnClick] = useState(false);
    const [inputValue, setInputValue] = useState("");

    const [hover, setHover] = useState(false);

    // const [firstName, setFirstName] = useState('');
    // const [lastName, setLastName] = useState('');
    // const [state, setState] = useState('');
    // const [district, setDistrict] = useState('');
    // const [village, setVillage] = useState('');
    // const [panNumber, setPanNumber] = useState('');
    // const [adharNumber, setAdharNumber] = useState('');

    const {
        transcript,
        interimTranscript,
        finalTranscript,
        resetTranscript,
    } = useSpeechRecognition();

    useEffect(() => {
        if (finalTranscript !== '') {
            console.log('Got final result:', finalTranscript);
        }
    }, [interimTranscript, finalTranscript]);

    const listenContinuously = () => {
        SpeechRecognition.startListening({
            continuous: true,
            language: 'en-IN',
        });
    };

    function btnClickFunction(e) {
        if(btnClick) {
            setInputValue(transcript);
            const field = props.fieldName;
            props.formDetailsList.push({field: transcript});
            props.formFunction(props.formDetailsList);
            setBtnClick(false);
            resetTranscript();
            SpeechRecognition.stopListening();
        } 
        else {
            setHover(false);
            listenContinuously();
            setBtnClick(true);
        }
    }

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    return (
        <section className='w-full h-full pb-[20px]'>
            <section className='flex flex-col w-full h-full'>
                {btnClick ? (
                    <section className='w-[365px] h-[0px] text-[10px] text-gray-500 pr-[8px] flex justify-end'>
                        Recording...
                    </section>
                ) : null}
            </section>

            <section className='w-full flex flex-row justify-between'>
                <section className=' text-gray-600 h-[28px] bg-white w-[115px]'>
                    {props.fieldName} <span className='ml-[-4px] text-red-700'>*</span>
                </section>

                <section className='w-[175px] flex'>
                    {
                        hover ?
                        (
                            <section className='w-[170px] h-[25px] bg-gray-300 text-center border rounded-lg'>
                                Tap to start Recording
                            </section>
                        )
                        :
                        (
                            null
                        )
                    }
                </section>
            </section>
            
            <section className='flex flex-row justify-center items-center w-[370px] h-[54px] border-solid border-[#e0e5f2] outline-none bg-white pl-[16px] relative h-12 items-start border rounded-lg font-medium'>
                <input
                    placeholder={props.placeholderData}
                    type='text'
                    value={inputValue}
                    onChange={handleInputChange}
                    className='w-[320px] h-[52px] outline-none'
                />
                <button onMouseEnter={()=>setHover(true)} onMouseLeave={()=>setHover(false)} onClick={btnClickFunction} className={`${btnClick ? 'bg-green-400' : 'bg-gray-400'} w-[60px] h-[54px] flex justify-center items-center rounded-r-lg`}>
                    <FaMicrophone color='white' />
                </button>
            </section>
        </section>
    )
}

export default InputContainer;
