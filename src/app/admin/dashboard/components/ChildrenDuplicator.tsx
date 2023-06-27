// This is a component that receives a children prop and replicates it n times, useful to make skeleton content

export default function ChildrenDuplicator({children, amount}: {children: any, amount: number}){
  const arr = Array(amount).fill(children)
  return (
    <>
    {arr.map(children => children)}
    </>
  )
}