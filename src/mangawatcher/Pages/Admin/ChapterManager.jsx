import { MangaLayout } from "../../layout/MangaLayout"
import { useParams } from "react-router-dom";
import { AdminAddChapter, AdminEditChapter } from "../../view";


export const ChapterManager = () => {

	const { action } = useParams();

    

    return (
        <MangaLayout>

            {
                ( action === 'add' )
                ? ( <AdminAddChapter /> )
                : ( <AdminEditChapter /> )
            }
            
        </MangaLayout>
    )
}
