import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { callAllSpacesAPI } from "../../apis/SpaceAPICalls";
import Pagination from "./Pagination";

function SpacePage() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { spaceList, totalPages, error } = useSelector(state => state.spacePageReducer);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        dispatch(callAllSpacesAPI(currentPage));
    }, [dispatch, currentPage]);

    // 현재 페이지 변경 핸들러
    const pageChangeHandler = (newPage) => {
        setCurrentPage(newPage);
    };

    // 페이지 이동 핸들러
    const pageHandler = (id) => {
        navigate(`/holdup/spaces/${id}`);
    };

    // 공간 등록 버튼 클릭 핸들러
    const createSpaceHandler = () => {
        navigate(`/holdup/createSpace`);
    };

    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            <span>등록된 공간들</span>
            {spaceList && spaceList.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>공간 제목</th>
                            <th>등록일시</th>
                        </tr>
                    </thead>
                    <tbody>
                        {spaceList.map(space => (
                            <tr key={space.id} onClick={() => pageHandler(space.id)} style={{ cursor: "pointer" }}>
                                <td>{space.title}</td>
                                <td>{space.createDate}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <span>등록된 공간이 없습니다.</span>
            )}

            <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={pageChangeHandler}
            />
        </div>
    );
}

export default SpacePage;