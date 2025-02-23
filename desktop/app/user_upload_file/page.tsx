export default function UserUploadFile() {
    return (
        <div className='flex flex-row w-full h-full'>
            <div className='w-1/2 flex flex-col items-center justify-center gap-8'>
                <div className="flex flex-col justify-center items-center min-w-[20%] w-[200px] max-w-[40%] ">
                    <div className='p-16 gap-2 flex justify-center items-center aspect-square border-dashed border-4 border-accent rounded-4xl'>
                        <img
                            src='document.png'
                            className=''
                        />
                    </div>
                    <p className='text-text'>Drag and drop a file, or click</p>
                </div>
                <div className="flex flex-col gap-2 w-[300px]">
                    <p className="text-secondary text-2xl">Choose an Organization:</p>
                    <select className="bg-secondary w-full p-4">
                        <option>Option1</option>
                        <option>Option2</option>
                        <option>Option3</option>
                    </select>
                </div>
                <div className="flex flex-col gap-2 w-[300px]">
                    <p className="text-secondary text-2xl">Choose Group to Share to:</p>
                    <select className="bg-secondary w-full p-4">
                        <option>Option1</option>
                        <option>Option2</option>
                        <option>Option3</option>
                    </select>
                </div>
                <div className="button">
                    Upload!
                </div>
            </div>
            <div className='w-1/2 bg-accent home-clip-right flex flex-col justify-center items-center'>
                <img 
                    src='jafe_small.png'
                />
                <p className='text-7xl w-1 flex-wrap text-secondary flex justify-center text-center'>Upload</p>
            </div>
            {/* <h1>User Upload File</h1>
            <p>Get all of the organizations the current IP/MAC is associated with</p>
            <p>Select which organization you are uploading to</p>
            <p>Upload your file (take into account max file size)</p>
            <p>Get shareable link, and share the link</p> */}
        </div>
    );
}