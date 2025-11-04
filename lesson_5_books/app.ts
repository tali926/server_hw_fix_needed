import express, {Express, Request, Response} from "express";
import { Books } from "./books";
import {lodash} from "lodash";

const HOST = "127.0.0.1";
const PORT= 5000;

export default class App{
    private app: express;
    private arr : Array <Books>;


    constructor(){
        this.app= express();
        this.arr= [];
    }
    public init() {
            this.app.use(express.json()); 
            this.setRoutes();
    
            this.app.listen(PORT, HOST, () => {
                console.log(`Server is listening on: http://${HOST}:${PORT}`);
            });
    
        }

        private setRoutes(){
        this.app.get("/api/books", (req: Request, res: Response) => {
            const hasPrice=this.arr.some(b=>b.price!=undefined);
            const key=hasPrice? price:code;
            const sorted =sortBy(this.arr,[key]);
            res.send(sorted);
        });

        this.app.get("/api/books/:code", (req: Request, res: Response)=> {
            const code= parseInt(req.params.code);

          const book = this.arr.find(b => b.code == code);
            if (!book) {
                res.status(404).send("book was not found");
            }
            res.send(book);

        });

        this.app.post("/api/books",(req: Request, res: Response)=>{
            const books: Books= req.body;
            this.arr.push(books);
            res.status(201);
        });

    this.app.put("/api/books/:code", (req: Request, res: Response) => {
            const code = parseInt(req.params.code); 
            const bookIndex = this.arr.findIndex(b => b.code == code);
            if (bookIndex == -1) {
                res.status(404).send("book was not found");
            }

            const book: Books = req.body;
           

            this.arr[bookIndex] = book;
            res.end();
        });

        this.app.delete("api/books/:code", (req: Request, res: Response) => {
             const code= parseInt(req.params.code);
              const bookIndex = this.arr.findIndex(b => b.code == code);
            if (bookIndex == -1) {
                res.status(404).send("book was not found");
            }

        this.arr.splice(bookIndex,1);
       res.send(arr);
        })
}

}

