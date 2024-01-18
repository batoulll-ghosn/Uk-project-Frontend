import React, { useEffect,useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllReviews,deleteReview ,UpdateToNOTSelected,UpdateToSelected} from '../actions/review'; 
import { toast } from 'react-toastify';
const Reviews = () => {
  const dispatch = useDispatch();
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const reviews = useSelector((state) => state.reviews);
  const [userToDelete, setUserToDelete] = useState(null);
  const handleDelete = (reviewId) => {
    setShowDeletePopup(true);
    setUserToDelete(reviewId);
  };
  const confirmDelete = () => {
    dispatch(deleteReview(userToDelete));
    setShowDeletePopup(false);
    toast.success('User Deleted Successfully!');
  };
  const cancelDelete = () => {
    setShowDeletePopup(false);
  };
  const handleCheckboxClick = (review) => {
    if (review.selected !== 1) {
        dispatch(UpdateToSelected(review.id));
        toast.success('Updated Review For Selected!');
    } else {
      dispatch(UpdateToNOTSelected(review.id));
        toast.success('Updated Review For Selected!');
    }
  };
  useEffect(() => {
    dispatch(getAllReviews());
  }, [dispatch],confirmDelete,handleCheckboxClick);

  return (
    <>
      <div className="the-div-of-users">
        <table className="the-users-table">
          <thead>
            <tr>
              <th></th>
              
              <th>Provider</th>
              <th>Description</th>
              <th>Selected </th>
              <th> Action</th>
            </tr>
          </thead>
          <tbody>
            {reviews?.map((review, index) => (
              <tr className='reviews-row' key={index}>
                <td>{index+1}</td>
                
                <td>{review.nameOftestemoniated}</td>
                <td>{review.description}</td>
                <td>
                  <input
                    type="checkbox"
                    checked={review.selected === 1}
                    readOnly
                    onClick={() => handleCheckboxClick(review)}
                  />
                  {review.selected === 1 ? 'Yes' : 'No'}
                </td>
                <button onClick={() => handleDelete(review.id)}><img className='bin-in-tables' src='./images/bin.svg'/></button>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showDeletePopup && (
        <div className="Confoverlay">
          <div className="Conferencepopup">
            <div className="Conferencepopup-content">
              <p>Are you sure you want to delete?</p>
              <div className="buttonsOfConfPopup">
                <button className="left-side-of-header-button" onClick={confirmDelete}>
                  Yes
                </button>
                <button className="left-side-of-header-button" onClick={cancelDelete}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Reviews;
