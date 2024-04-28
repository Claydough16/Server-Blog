const router = require('express').Router();
const fs = require('fs');
let blog = require('../api/blog.json')

router.get('/', (req, res) => {
    try {
        
        res.status(200).json({
            results: blog
        })
    } catch (error) {
        res.status(500).json({
            error: error
        })
    }
})

router.get('/:id', (req, res) => {
    console.log(req.params.id)
    // console.log(blog.id)
    try {
        let id = req.params.id
        let results = blog.filter(i => i.post_id == id)
        res.status(200).json({
            // status: `Found item at id: ${id}`,
            results: results[0]
        })
    } catch (error) {
        res.status(500).json({
            error: error
        })
    }
})

router.post("/newentry", (req, res) => {
    try {
        let newEntry = req.body;
        let newID = blog.at(-1).post_id + 1;
        let blogToWrite = blog;
        
        newEntry["post_id"] = newID;
        
        blogToWrite.push(newEntry);
        fs.writeFile(
            "./api/blog.json",
            JSON.stringify(blogToWrite),
            function (err) {
                if (err) throw err;
                blog = blogToWrite;
            }
        );
        res.status(200).json({
            results: blog
        })
        } catch (error) {
            res.status(500).json({
                error: error,
            });
        }
    });
    
    router.post('/:id', (req, res) => {

        try {
            let id = req.params.id
            let results = blog.filter(i => i.post_id == id)
            if (results == undefined) {
                throw "id does not exist"
            }
            let updateIndex = blog.findIndex(i => i.post_id == id)
            let blogToWrite = blog;

            blogToWrite[updateIndex]["title"] = req.body["title"];
            blogToWrite[updateIndex]["author"] = req.body["author"];
            blogToWrite[updateIndex]["body"] = req.body["body"];

            fs.writeFile("./api/blog.json", JSON.stringify(blogToWrite), function (error) {
                if (error) throw error;
                blog = blogToWrite;
            })
            res.status(200).json({
                results: blog
            })
        } catch (error) {
            res.status(400).json({
                error: error
            })
        }
    })
    
    router.delete('/:id', (req, res) => {
        try {
            let id = req.params.id
            let results = blog.filter(i => i.post_id == id)
                if (results == undefined) {
                    throw "id does not exist"
                }

            let updateIndex = blog.findIndex(i => i.post_id == id)
            let blogToWrite = blog;

            blogToWrite.splice(updateIndex, 1)

            fs.writeFile("./api/blog.json", JSON.stringify(blogToWrite), function (error) {
                if (error) throw error;
                blog = blogToWrite;
            })
            res.status(200).json({
                results: blog
            })
        } catch (error) {
            res.status(400).json({
                error: error
            })
        }
    })
    
    module.exports = router