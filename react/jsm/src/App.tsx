import { useEffect, useState } from 'react'

const Card = ({ title }: { title: string }) => {
  const [hasLiked, setHasLiked] = useState(false);
  const [count, setCount] = useState(0);
  useEffect(() => {
    console.log(`Card with title "${title}" has been mounted.`);
    return () => {
      console.log(`Card with title "${title}" has been unmounted.`);
    }
  }, []);

  return (
    <div className="card">
      <h2>{title}</h2>
      <div>Views: {count}</div>
      <div className='buttons'>
        <button onClick={() => setCount( prevCount => prevCount + 1 )}>
          Viewed
        </button>
        <button onClick={() => setHasLiked(!hasLiked)}>
          {hasLiked ? '❤️' : '🤍'}
        </button>
      </div>
    </div>
  )
}

const App = () => {
  return (
    <div className='card-container'>
      <Card title="Star Wars" />
      <Card title="Avatar" />
      <Card title="The Lion King" />
    </div>
  )
}

export default App
