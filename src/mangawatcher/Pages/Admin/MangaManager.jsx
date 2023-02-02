import { MangaLayout } from "../../layout/MangaLayout"
import { useParams } from "react-router-dom";
import { AdminAddManga, AdminEditManga } from "../../view";

export const MangaManager = () => {

	const { action } = useParams();

    return (
        <MangaLayout>

            {
                ( action === 'add' )
                ? ( <AdminAddManga /> )
                : ( <AdminEditManga /> )
            }
            
        </MangaLayout>
    )
}
