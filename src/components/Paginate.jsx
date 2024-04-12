import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { DOTS, usePagination } from "./usePagination";


const Paginate = ({
	totalCount,
	currentPage,
	pageSize,
	onNext,
	onPrev,
	onSelect,
	changeLimit,
	lastPage
}) => {
	const paginationRange = usePagination({
		currentPage,
		totalCount,
		siblingCount: 1,
		pageSize,
	});

	return (
		<div className="d-flex justify-content-between align-items-center">
			<div className="select">
				<select
					value={`${pageSize}`}
					onChange={(e) => changeLimit(e.target.value)}
				>
					<option value={"20"}>20</option>
					 
				</select>
				<span>entries per page</span>
			</div>

			<div className="main-pagination">
				{currentPage > 1 && (
					<button onClick={() => onPrev(currentPage - 1)}>
						<MdKeyboardArrowLeft /> Previous
					</button>
				)}
				{paginationRange &&
					paginationRange.map((p, i) => (
						<div className="keys" key={i + 1}>
							{p === DOTS ? (
								<span>---</span>
							) : (
								<button
									className={
										p === currentPage ? "active" : ""
									}
									onClick={() => onSelect(p)}
								>
									{p}
								</button>
							)}
						</div>
					))}
					{lastPage !== currentPage &&
				<button onClick={() => onNext(currentPage + 1)}>
					Next <MdKeyboardArrowRight />
				</button>}
			</div>
			<div className="infos">
				<p>
					{totalCount} {totalCount > 1 ? "entries" : "entry"}
				</p>
			</div>
		</div>
	);
};

export default Paginate;
