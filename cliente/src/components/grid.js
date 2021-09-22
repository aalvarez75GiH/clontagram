import React from 'react'
import PostItem from './postItem'

const Grid = ({ posts }) => {

const columns = posts.reduce((columns, post) => {
    const lastColumn = columns[columns.length - 1]
    
    if (lastColumn && lastColumn.length < 3){
        lastColumn.push(post)
    }else{
        columns.push([post])
    }
    return columns    
    
},[])

// console.log('List of Posts:', posts)
// console.log('Columns:', columns)
// console.log('Number of columns:', columns.length)
return (
    <div>
        {
            columns.map(( column, index ) => {
                return(
                    <div 
                    key={index}
                    className="Grid__row">
                        {
                            column.map((post) => (
                                <PostItem key={post._id} { ...post }/>
                            ))
                        }
                    </div>
                )
            })
        }
    </div>
)

}

export default Grid

