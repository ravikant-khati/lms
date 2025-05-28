import { useSelector } from "react-redux"
import { Navigate, useParams } from "react-router-dom"
import { useGetCourseDetailWithStatusQuery } from "../features/apis/coursePurchaseAPI"

const ProtectedRouteForLoggedInUser = ({children})=>{
    const {isAuthenticated} = useSelector(store=>store.auth)
    if(!isAuthenticated){
        return <Navigate to={'/login'} />
    }
    return children
}
const AlreadyLoggedInForAuthenticationPage = ({children})=>{
    const {isAuthenticated} = useSelector(store => store.auth )
    if(isAuthenticated){
        return <Navigate to={'/'} />
    }
    console.log('rendered');
    return children
}
const ProtectedRouteForAdmin = ({children})=>{
    const {isAuthenticated , user} = useSelector(state=>state.auth)
    if(isAuthenticated && user.role === "instructor"){
        return children
    }
    else{
        return <h1>you are not authorised</h1>
    }
}
const ProtectedRouteForPurchasedCourse = ({children})=>{
    const {courseID} = useParams()
    const { data , isLoading , isSuccesss } = useGetCourseDetailWithStatusQuery(courseID)
    if(isLoading){
        return <h1>please wait. loading...</h1>
    }
    const {course , purchaseStatus} = data;
    console.log(data);
    if(!purchaseStatus){
        return  <Navigate to={`/course-detail/${courseID}`}></Navigate>
    }
    else{
        return children
    }
}
export {ProtectedRouteForLoggedInUser , AlreadyLoggedInForAuthenticationPage , ProtectedRouteForAdmin , ProtectedRouteForPurchasedCourse}