<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Carbon;
class UserController extends Controller
{
    // public static $wrap = false;
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {

        $users = User::query();
        $sortField = request("sort_field", "created_at");
        $sortDirection = request("sort_direction", "desc");
        if ($request->has('sort_coloumn') &&  $request->has('sort_by')) {
        }
        if ($request->has('name')) {
            $users->where('name', 'like', '%' . request('name') . '%');
        }
        if ($request->has('email')) {
            $users->where('email', request('email'));
        }
        $users = $users->orderBy($sortField, $sortDirection)->paginate(10)->onEachSide(1);
        $usersResource = UserResource::collection($users);
        return inertia('User/Index', [
            'users' => $usersResource,
            'queryParams' => $request->query() ?: null,
            'success' => session('success'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('User/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request)
    {
        $data = $request->validated();
        $data['email_verified_at'] = Carbon::now();
        User::create($data);
        return to_route('user.index')->with('success', "User was created successfully.");
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        return inertia('User/Edit', [
            'user' => new UserResource($user)
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, User $user)
    {
        $data = $request->validated();
        $data['password'] = $data['password'] ? Hash::make($data['password']) : $user->password;
        $data['email_verified_at'] = Carbon::now();
        $user->update($data);
        return to_route('user.index')->with('success', "User was updated");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        $user->delete();
        return to_route('user.index')->with('success', 'User was deleted');
    }
}
