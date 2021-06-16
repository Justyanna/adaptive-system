import { useState, useEffect, createContext } from 'react';
import { useParams } from 'react-router-dom';
import { getCourse, updateCourse } from '../../services/courses';
import LessonEdit from './LessonEdit';
import TestEdit from './TestEdit';
import LessonList from './LessonList';

export const CourseContext = createContext(null);

const Course = () => {

	const { courseId } = useParams();

	const [ course, setCourse ] = useState(null);
	const [ lessonList, setLessonList ] = useState(null);
	const [ testsList, setTestsList ] = useState(null);
	const [ saved, setSaved ] = useState(true);
	const [ editLesson, setEditLesson ] = useState(-1);
	const [ editTest, setEditTest ] = useState(-1);

	useEffect(
		() => {
			let mounted = true;
			getCourse(courseId).then(({ data }) => {
				if (!mounted) return;
				setLessonList(data.lessons);
        setTestsList(data.tests);
				delete data.lessons;
				setCourse(data);
			});
			return () => {
				mounted = false;
			};
		},
		[ courseId ]
	);

	const saveChanges = async () => {
		try {
			const res = await updateCourse(courseId, {
				...course,
				lessons: lessonList,
        		tests: testsList
			});
			setSaved(true);
		} catch (e) {
			console.dir(e);
		}
	};

	const addLesson = () => {
		setLessonList([
			...lessonList,
			{
				title: `Lekcja ${lessonList.length + 1}`,
				description: 'Nowa lekcja',
				activities: []
			}
		]);
		setSaved(false);
	};

	const addTest = () => {
		setTestsList([
			...testsList,
			{
				title: `Test ${testsList.length + 1}`,
				description: 'Noway Test',
				questions: []
			}
		]);
		setSaved(false);
	};

	const updateLesson = (idx, updated) => {
		const tmp = lessonList;
		tmp.splice(idx, 1, updated);
		setLessonList(tmp);
		setSaved(false);
	};

  const updateTest = (idx, updated) => {
		const tmp = testsList;
		tmp.splice(idx, 1, updated);
		setTestsList(tmp);
		setSaved(false);
	};

	const moveLessonUp = (idx) => {
		const tmp = [ ...lessonList ];
		const el = tmp.splice(idx, 1);
		tmp.splice(idx - 1, 0, ...el);
		setLessonList(tmp);
		setSaved(false);
	};        

	const moveLessonDown = (idx) => {
		const tmp = [ ...lessonList ];
		const el = tmp.splice(idx, 1);
		tmp.splice(idx + 1, 0, ...el);
		setLessonList(tmp);
		setSaved(false);
	};

  const moveTestUp = (idx) => {
		const tmp = [ ...testsList ];
		const el = tmp.splice(idx, 1);
		tmp.splice(idx - 1, 0, ...el);
		setTestsList(tmp);
		setSaved(false);
	};
  
	const moveTestsDown = (idx) => {
		const tmp = [ ...testsList ];
		const el = tmp.splice(idx, 1);
		tmp.splice(idx + 1, 0, ...el);
		setTestsList(tmp);
		setSaved(false);
	};

	const removeLesson = (idx) => {
		const tmp = [ ...lessonList ];
		tmp.splice(idx, 1);
		setLessonList(tmp);
		setSaved(false);
	};

  const removeTest = (idx) => {
		const tmp = [ ...testsList ];
		tmp.splice(idx, 1);
		setTestsList(tmp);
		setSaved(false);
	};

	if (!course)
		return (
			<main className="layout">
				<h1> Kurs {courseId}(wersja edytowalna) </h1> {' '}
			</main>
		);

	return (
		<main className="layout">
			<h1> {course.name}(edytowanie) </h1> {' '}
			<CourseContext.Provider
				value={{
					addLesson,
					updateLesson,
					moveLessonUp,
					moveLessonDown,
					removeLesson,
					addTest,
					updateTest,
					removeTest,
					moveTestsDown,
					moveTestUp,
					saveChanges,
					saved,
					setSaved,
					setEditLesson, 
					setEditTest
				}}
			>
				{ editLesson < 0 && editTest < 0 ? (
					<LessonList lessons={lessonList} tests={testsList} saved={saved} />	
				) : (
					editLesson >= 0 ?(<LessonEdit data={lessonList[editLesson]}  idx={editLesson} />) : 
					(editTest >= 0 ?(<TestEdit data={testsList[editTest]}  idx={editTest} />):null)
					
				)}
				
				{' '}
				{' '}
			</CourseContext.Provider>{' '}
			{' '}
		</main>
	);
};

export default Course;
