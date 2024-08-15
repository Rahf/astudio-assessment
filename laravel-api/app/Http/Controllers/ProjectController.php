<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Project;

class ProjectController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'department' => 'required|string|max:255',
            'start_date' => 'required|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'status' => 'required|in:ongoing,completed,on-hold',
        ]);

        $project = Project::create($validated);

        return response()->json($project, 201);
    }

    public function show($id)
    {
        $project = Project::findOrFail($id);

        return response()->json($project);
    }

    public function index(Request $request)
    {
        $projects = Project::where(function($query) use ($request) {
            if ($request->name) {
                $query->where('name', 'like', '%' . $request->name . '%');
            }
            if ($request->department) {
                $query->where('department', 'like', '%' . $request->department . '%');
            }
            if ($request->status) {
                $query->where('status', $request->status);
            }
            if ($request->start_date) {
                $query->where('start_date', '>=', $request->start_date);
            }
            if ($request->end_date) {
                $query->where('end_date', '<=', $request->end_date);
            }
        })->get();

        return response()->json($projects);
    }

    public function update(Request $request)
    {
        $project = Project::findOrFail($request->id);

        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'department' => 'sometimes|string|max:255',
            'start_date' => 'sometimes|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'status' => 'sometimes|in:ongoing,completed,on-hold',
        ]);

        $project->update($validated);

        return response()->json($project);
    }

    public function destroy(Request $request)
    {
        $project = Project::findOrFail($request->id);
        $project->timesheets()->delete(); // Delete related timesheets
        $project->delete();

        return response()->json(null, 204);
    }
}
