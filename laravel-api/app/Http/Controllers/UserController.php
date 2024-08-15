<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller
{
    public function store(Request $request) {
        $validated = $request->validate([
            'first_name' => 'required|string',
            'last_name' => 'required|string',
            'date_of_birth' => 'required|date',
            'gender' => 'required|in:male,female,other',
            'email' => 'required|string|email|unique:users',
            'password' => 'required|string|min:8',
        ]);

        $validated['password'] = bcrypt($validated['password']);
        $user = User::create($validated);

        return response()->json($user, 201);
    }

    public function show($id) {
        $user = User::findOrFail($id);
        return response()->json($user);
    }

    public function index(Request $request) {
        $users = User::where(function($query) use ($request) {
            if ($request->first_name) {
                $query->where('first_name', $request->first_name);
            }
            if ($request->gender) {
                $query->where('gender', $request->gender);
            }
            if ($request->date_of_birth) {
                $query->where('date_of_birth', $request->date_of_birth);
            }
        })->get();

        return response()->json($users);
    }

    public function update(Request $request) {
        $user = User::findOrFail($request->id);
        $user->update($request->all());
        return response()->json($user);
    }

    public function destroy(Request $request) {
        $user = User::findOrFail($request->id);
        $user->delete();
        return response()->json(null, 204);
    }
}
