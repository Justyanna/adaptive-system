import styles from './Course.module.css'
import Component from "./Component"
import {  useContext } from 'react'
import { UserContext } from '../../contexts/UserContext'

const Activity = ({activity}) => {
    const { user } = useContext(UserContext)
    return <> 
    { <div className={`card flow ${styles.activity}`}>
            <div className={styles['lesson-info']}>
                {  
                    <> 
                        {activity.components &&  <h2 className={styles['lesson-title']}>{activity.title}</h2>  }
                        { activity.components && activity.components.length > 0 && activity.components.map(component => <Component component={component}/>)}
                    </>
                }
                {  
                    user.yAxis <= 0 && activity.gamma && activity.gamma.length > 0 && 
                    <>
                        <h2 className={styles['lesson-title']}>{activity.title}</h2> 
                        {activity.gamma.map((component, key) => <Component key ={key} component={component}/>)}  
                    </> 
                }
                {  
                    user.yAxis > 0 && activity.alpha && activity.alpha.length > 0 &&
                    <>
                        <h2 className={styles['lesson-title']}>{activity.title}</h2> 
                        {activity.alpha.map((component, key) => <Component key ={key} component={component}/>)}  
                    </> 
                }
                {  
                    user.xAxis > 0 && activity.beta && activity.beta.length > 0 &&
                    <>
                        <h2 className={styles['lesson-title']}>{activity.title}</h2> 
                        {activity.beta.map((component, key) => <Component key ={key} component={component}/>)}  
                    </> 
                }
                {  
                    user.xAxis <= 0 && activity.delta && activity.delta.length > 0 &&
                    <>
                        <h2 className={styles['lesson-title']}>{activity.title}</h2> 
                        {activity.delta.map((component, key) => <Component key ={key} component={component}/>)}  
                    </> 
                }
			</div>
        </div>   
    }
    </>
}

export default Activity