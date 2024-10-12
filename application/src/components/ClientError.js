import { useEffect } from 'react';

export default function ClientError({
    error,
    reset,
}) {
    useEffect(() => {
        // Optionally log the error to an error reporting service
        console.error(error);
    }, [error]);

    return (
        <div style={{ height: '90vh' }} className='d-flex flex-column justify-content-center align-items-center'>
            <h5 className="text-center">{error}</h5>
            <button
                className="btn btn-outline-secondary m-2"
                onClick={
                    // Attempt to recover by trying to re-render the invoices route
                    () => reset()
                }
            >
                Go Home
            </button>
        </div >
    );
}