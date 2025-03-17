import React from 'react'
import {Button} from './ui/button'
import WeightListItem from './WeightListItem'

function WeightList({weightData}) {

  // Sortera listan efter datum
  const sortedWeightData = [...weightData].sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className='card mx-auto'>
      <h3 className='text-lg font-bold text-gray-700 mb-4'>Historik Vikt</h3>
      {sortedWeightData.length > 0 ? (
        sortedWeightData.map((weight) => (
          <WeightListItem key={weight.id} weightData={weight} />
        ))
      ) : (
        <p className='text-gray-500'>Ingen vikt registrerad.</p>
      )}
    </div>
  )
}

export default WeightList
