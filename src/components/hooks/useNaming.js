import { useState , useEffect } from 'react'

export function useNameing(initStr) {
    
    const [naming, setNaming] = useState(initStr)
    useEffect(() =>{
        document.title = naming;
    }, [naming])

    const ChangeSiteName = (newName) => {
        setNaming(newName);
    }

  return {
    naming, ChangeSiteName
  }
}