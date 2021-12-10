import {useParams} from 'react-router-dom'

export default function Curso() {
    const { courseId } = useParams()
    return (
        <div>
            Curso id: {courseId}
        </div>
    )
}