import { useState, useEffect } from 'react'
import { getCourseList } from '../services/courses'


const Home = () =>
{
    const [courseList, setCourseList] = useState([])
    useEffect(async () =>
    {
        let res = await getCourseList()
        setCourseList(res.data)
    })

    return (
        <div>
            <h2>Strona główna</h2>
            <ul>
                {courseList.map(course => (<li>{course.name}</li>))}
            </ul>
        </div>
    )
}

export default Home
