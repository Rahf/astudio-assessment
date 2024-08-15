<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Timesheet;

class TimesheetController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'task_name' => 'required|string',
            'date' => 'required|date',
            'hours' => 'required|integer|min:1',
            'user_id' => 'required|exists:users,id',
            'project_id' => 'required|exists:projects,id',
        ]);

        $timesheet = Timesheet::create($validated);

        return response()->json($timesheet, 201);
    }

    public function show($id)
    {
        $timesheet = Timesheet::findOrFail($id);

        return response()->json($timesheet);
    }

    public function index(Request $request)
    {
        $timesheets = Timesheet::where(function($query) use ($request) {
            if ($request->task_name) {
                $query->where('task_name', 'like', '%' . $request->task_name . '%');
            }
            if ($request->date) {
                $query->where('date', $request->date);
            }
            if ($request->user_id) {
                $query->where('user_id', $request->user_id);
            }
            if ($request->project_id) {
                $query->where('project_id', $request->project_id);
            }
        })->get();

        return response()->json($timesheets);
    }

    public function update(Request $request)
    {
        $timesheet = Timesheet::findOrFail($request->id);

        $validated = $request->validate([
            'task_name' => 'sometimes|string',
            'date' => 'sometimes|date',
            'hours' => 'sometimes|integer|min:1',
            'user_id' => 'sometimes|exists:users,id',
            'project_id' => 'sometimes|exists:projects,id',
        ]);

        $timesheet->update($validated);

        return response()->json($timesheet);
    }

    public function destroy(Request $request)
    {
        $timesheet = Timesheet::findOrFail($request->id);
        $timesheet->delete();

        return response()->json(null, 204);
    }
}
