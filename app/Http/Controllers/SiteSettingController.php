<?php

namespace App\Http\Controllers;

use App\Models\SiteSetting;
use Illuminate\Http\Request;

class SiteSettingController extends Controller
{
    public function updateHomeLayout(Request $request)
    {
        $user = $request->user();
        abort_unless($user && $user->is_owner, 403);

        $validated = $request->validate([
            'home_layout' => ['required', 'string', 'in:grid,split,featured,stacked'],
        ]);

        SiteSetting::updateOrCreate(
            ['key' => 'home_layout'],
            ['value' => $validated['home_layout']],
        );

        return back()->with('success', 'Majas lapas izkartojums atjaunots.');
    }
}
