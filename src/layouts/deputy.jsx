import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOneDeputy, loadOneDeputy } from '../store/deputy';

const Deputy = ({match}) => {
    const dispatch = useDispatch()
    const deputyName = match.params.deputyName
    const deputy = useSelector(getOneDeputy())      // Данные из магазина или склада, короче, из store )
    
    useEffect(()=>{
        dispatch(loadOneDeputy(deputyName))
    },[])
    

    return ( <h2>Это страница с персональной информацией о депутате: {deputy}</h2> );
}
 
export default Deputy;