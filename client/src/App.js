import React from 'react';
import "./index.css"
import InputContainer from './components/InputContainer';

function App() {
    const formList = [
      {
        fieldName : 'First Name', 
        placeholderData : 'Swapnil'
      }, 
      {
        fieldName : 'Last Name', 
        placeholderData : 'Nikumbh'
      }, 
      {
        fieldName : 'State', 
        placeholderData : 'Maharashtra'
      },
      {
        fieldName : 'District', 
        placeholderData : 'Haveli'
      },
      {
        fieldName : 'Village', 
        placeholderData : 'Haveli'
      },
      {
        fieldName : 'Pan number', 
        placeholderData : 'ASXO87353'
      },
      {
        fieldName : 'Adhar number', 
        placeholderData : '14334547849'
      }
    ]

    const handleSubmit = async ()=>{
      try{
        // get the data from the api
        const response = await fetch('http://localhost:8080/form', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              firstName, lastName, state, district, village, panNumber, adharNumber 
            }),
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
              <InputContainer key={index} fieldName={data.fieldName} placeholderData={data.placeholderData} />
              {
                 data.fieldName === 'Last Name' || data.fieldName === 'Village'
                 ?
                 (
                  <section className='text-gray-400'>
                    ----------------------------------------------------------------------------
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