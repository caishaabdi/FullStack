import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

export default function DialogForm() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState('');
    const [loading, setLoading] = useState(false);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     setLoading(true);

    //     // Initialize FormData inside handleSubmit
    //     const formData = new FormData();
    //     formData.append('title', title);
    //     formData.append('content', content);
    //     if (image) {
    //         formData.append('image', image);
    //     }


    //     try {

    //         const response = await axios.post('/api/post/create-Post', formData, {
    //             headers: {
    //                 'Content-Type': 'multipart/form-data',
    //             }
    //         });

    //         // Reset states on success
    //         setTitle('');
    //         setContent('');
    //         setImage(null);
    //         setPreview('');
    //         toast.success(`Post created successfully`);
    //     } catch (error) {
    //         const errorMessage = error.response?.data?.message || 'Something went wrong.';
    //         toast.error(errorMessage);
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        if (image) {
            formData.append('image', image);
        }


        try {


            let response;


            response = await axios.post('/api/post/create-Post', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setTitle('');
            setContent('');
            setImage(null);
            setPreview('');
            toast.success('Post created successfully!');





            // Reset form fields after submission


        } catch (error) {
            console.error('Full error details:', error);
            const errorMessage = error.response?.data?.message || 'Failed to create post';
            console.error('Error creating post:', errorMessage);
            toast.error(errorMessage);
        }

        finally {
            setLoading(false);
        }
    }

    return (
        <Dialog>
            <DialogTrigger>
                <Button>Create New Post</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create New Post</DialogTitle>
                    <DialogDescription>
                        Fill out the form below to create a new post.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="title">Title</Label>
                            <Input
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="content">Content</Label>
                            <Input
                                id="content"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                required
                            />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="image">Image</Label>
                            <Input
                                type="file"
                                id="image"
                                accept="image/*"
                                onChange={handleImageChange}
                            />
                            {preview && (
                                <img
                                    src={preview}
                                    alt="preview"
                                    className="mt-4 w-full h-auto"
                                />
                            )}
                        </div>
                        <DialogFooter>
                            <div className="flex flex-col space-y-1.5">
                                <Button
                                    type="submit"
                                    disabled={loading}
                                >
                                    {loading ? "Registering Post..." : "Submit Post"}
                                </Button>
                            </div>
                        </DialogFooter>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
