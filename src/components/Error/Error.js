
// import error from "./error.gif"

const Error = () => {
    return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
            {/* <img src={error} alt="Error" style={{ maxWidth: '400px' }} /> */}
            <h1>Что-то пошло не так!</h1>
            <p>Попробуйте перезагрузить страницу</p>
        </div>
    );
}

export default Error;