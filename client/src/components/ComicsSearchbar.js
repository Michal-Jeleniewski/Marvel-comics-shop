import Modal from "react-modal";
import { useState } from "react";
import ComicCard from "./ComicCard";


const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 5
    }
};

function ComicsSearchbar(props) {
    const [modalIsOpen, setIsOpen] = useState(false);
    const [chosenComic, setChosenComic] = useState({})

    function closeModal() {
        setIsOpen(false);
    }

    function handleInputClick(e) {
        props.setShowComicsRec(true)
    }
    function handleComicClick(e) {
        const comic = [...props.comics].find(el => el.title === e.target.innerText)
        setChosenComic(comic);
        setIsOpen(true);
    }

    return (
        <div className="comics_search_container">
            <input type="text"
                className="comics_search"
                placeholder="Search comics"
                onClick={(e) => handleInputClick(e)}
                onChange={(e) => props.setComicsSearch(e.target.value)}>
            </input>
            {props.showComicsRec &&
                (<div className="recommendations">
                    {[...props.comics].filter(el => el.title.includes(props.comicsSearch))
                        .map((el, i) => (<div className="comicName"
                            key={i}
                            onClick={(e) => handleComicClick(e)}>
                            {el.title}</div>))}</div>)}
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Comic-modal"
                appElement={document.getElementById("root") || undefined}
            >
                {modalIsOpen && <ComicCard
                    zIndex={2}
                    chosenComic={chosenComic}
                    loggedIn={props.loggedIn}
                    closeModal={closeModal}
                    setShowLoginForm={props.setShowLoginForm} />}
            </Modal>
        </div>)
}

export default ComicsSearchbar