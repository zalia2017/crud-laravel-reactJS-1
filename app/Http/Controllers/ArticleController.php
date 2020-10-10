<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ArticleController extends Controller
{
    //
    public function index() 
    {
        // $articles = \App\Models\Article::all();
        $articles = \App\Models\Article::paginate(20);
        // $articles = \App\Models\Article::query()->orderByDesc('id')->paginate(5);

        return $articles->toJson();
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'title' => 'required',
            'content' => 'required',
        ]);

        $project = \App\Models\Article::create([
            'title' => $validatedData['title'],
            'content' => $validatedData['content'],
        ]);

        $msg = [
            'success' => true,
            'message' => 'Article created successfully'
        ];

        

        return response()->json($msg);
    }

    public function show($id)
    {
        $article = \App\Models\Article::find($id);

        return $article->toJson();
    }

    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            'title' => 'required',
            'content' => 'required',
        ]);

        $article = \App\Models\Article::find($id);
        $article->title = $validatedData['title'];
        $article->content = $validatedData['content'];
        $article->save();

        $msg = [
            'success' => true,
            'message' => 'Article update successfully'
        ];

        return response()->json($msg);
    }

    public function destroy($id)
    {
        $article = \App\Models\Article::find($id);
        if(!empty($article)){
            $article->delete();
            $msg = [
                'success' => true,
                'message' => 'Article deleted successfully!'
            ];
            return response()->json($msg);
        }else{
            $msg = [
                'success' => false,
                'message' => 'Article deleted failed!'
            ];
            return response()->json($msg);
        }
    }
}
