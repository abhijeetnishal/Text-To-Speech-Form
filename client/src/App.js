import React, { useState } from 'react';
import "./index.css"
import InputContainer from './components/InputContainer';

function App() {
    const formList = [
      {
        field: 'firstName',
        fieldName : 'First Name', 
        placeholderData : 'Swapnil'
      }, 
      {
        field: 'lastName',
        fieldName : 'Last Name', 
        placeholderData : 'Nikumbh'
      }, 
      {
        field: 'state',
        fieldName : 'State', 
        placeholderData : 'Maharashtra'
      },
      {
        field: 'district',
        fieldName : 'District', 
        placeholderData : 'Haveli'
      },
      {
        field: 'village',
        fieldName : 'Village', 
        placeholderData : 'Haveli'
      },
      {
        field: 'panNumber',
        fieldName : 'Pan number', 
        placeholderData : 'ASXO87353'
      },
      {
        field: 'adharNumber',
        fieldName : 'Adhar number', 
        placeholderData : '14334547849'
      }
    ]

    const [formDetails, setFormDetails] = useState({}); 

    // Create callback function to update formDetails
    const updateFormDetails = (fieldName, value) => {
      setFormDetails((prevFormDetails) => ({
          ...prevFormDetails,
          [fieldName]: value,
      }));
    };

    const handleSubmit = async ()=>{
      try{
        // get the data from the api
        const response = await fetch('http://localhost:8080/form', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
              formDetails
            ),
            credentials: 'include'
        });

        await response.json();

        alert('File saved to DB');
      }
      catch(error){
        console.log(error);
      }
    }

    return (
      <main className='w-full flex flex-col justify-center items-center'>
        <section className='pb-[20px] pt-[10px] font-semibold text-[20px] text-gray-500'>
          Address Details
        </section>
        {
          formList.map((data, index)=>(
            <section key={index} className='flex flex-col'>
              <InputContainer key={index} field={data.field} fieldName={data.fieldName} placeholderData={data.placeholderData} formFunction={updateFormDetails} />
              {
                 data.fieldName === 'Last Name' || data.fieldName === 'Village'
                 ?
                 (
                  <section className='text-gray-400'>
                    ---------------------------------------------------
                  </section>
                 )
                 :
                 (null)
              }
            </section>
            )
          )
        }

        <button onClick={handleSubmit} className='mt-[20px] w-[370px] h-[54px] text-[white] border rounded-lg bg-blue-800 font-bold'>
          Submit
        </button>
      </main>
    );
}

export default App;